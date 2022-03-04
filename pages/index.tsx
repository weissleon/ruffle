import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { generateWinnerList, ItemMap } from "../lib/helper";
import { useRuffleData } from "../hooks/RuffleDataContext";
import { AnimatePresence, LayoutGroup, motion, Variants } from "framer-motion";
import AppBar from "@components/AppBar";
import Portal from "@components/Portal";
import SettingBox from "@components/SettingBox";
import ConfirmBox from "@components/dialog/ConfirmBox";
import LoadingBox from "@components/dialog/LoadingBox";

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const exitOverlayVariants: Variants = {
  hidden: { opacity: 0, zIndex: 0 },
  show: {
    opacity: 0,
    zIndex: 0,
  },

  exit: {
    zIndex: 100,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Home: NextPage = () => {
  // Create router
  const router = useRouter();

  const { ruffleData, setRuffleData } = useRuffleData();
  const [dialogIndex, setDialogIndex] = useState(0);

  const [portalOpened, setPortalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleOnSubmit({
    itemMap,
    pickSize,
  }: {
    itemMap: ItemMap;
    pickSize: number;
  }) {
    if (pickSize === 0) return;

    setRuffleData((draft) => {
      draft.itemMap = itemMap;
      draft.pickSize = pickSize;
    });

    setPortalOpened((prev) => !prev);
  }

  function handleOnDialogCancel() {
    setIsLoading(false);
    setPortalOpened(false);
  }

  async function handleOnDialogConfirm() {
    setDialogIndex(1);
    setIsLoading(true);
    const winnerList = generateWinnerList(
      ruffleData.itemMap,
      ruffleData.pickSize
    );
    setRuffleData((draft) => {
      draft.winnerList = winnerList;
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    router.push({
      pathname: "/result",
    });
  }

  // Texts to be displayed on the screen
  const mainTitle = `Ruffle`;

  const dialogs = [
    <ConfirmBox
      key={"confirmBox"}
      total={ruffleData.itemMap.size}
      pickSize={ruffleData.pickSize}
      onConfirm={handleOnDialogConfirm}
      onCancel={handleOnDialogCancel}
    />,
    <LoadingBox
      isLoading={isLoading}
      key={"loadingBox"}
      onCancel={handleOnDialogCancel}
    />,
  ];

  return (
    <motion.div
      className="relative grid h-screen w-full grid-flow-row grid-rows-[56px_minmax(auto,1fr)]"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* Exit overlay */}
      <motion.div
        variants={exitOverlayVariants}
        className="absolute inset-0  bg-white"
      />

      {/* Overlay */}
      <AnimatePresence>
        {portalOpened && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 z-[50] bg-slate-50/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <Portal>
        <AnimatePresence>
          {portalOpened && (
            <div className="absolute inset-0 flex items-center justify-center ">
              {/* <Overlay /> */}
              <div className="absolute inset-0 z-[70]"></div>
              <LayoutGroup>
                <motion.div
                  layout
                  className="relative z-[80] min-h-[20rem] w-3/5 min-w-min max-w-xl overflow-hidden rounded-md bg-white "
                >
                  <AnimatePresence exitBeforeEnter>
                    {dialogs[dialogIndex]}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            </div>
          )}
        </AnimatePresence>
      </Portal>

      <AppBar title={mainTitle} />
      <motion.main className="flex items-center justify-center py-4">
        <SettingBox onSubmit={handleOnSubmit} />
      </motion.main>
    </motion.div>
  );
};

export default Home;
