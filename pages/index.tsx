import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { generateWinnerList, ItemMap } from "../lib/helper";
import { useRuffleData } from "../hooks/RuffleDataContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
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

const Home: NextPage = () => {
  // Create router
  const router = useRouter();

  const { ruffleData, setRuffleData } = useRuffleData();

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

    const winnerList = generateWinnerList(itemMap, pickSize);

    setRuffleData((draft) => {
      draft.itemMap = itemMap;
      draft.pickSize = pickSize;
      draft.winnerList = winnerList;
    });

    setPortalOpened((prev) => !prev);
    // router.push({
    //   pathname: "/result",
    // });
  }

  function handleOnDialogCancel() {
    setIsLoading(false);
    setPortalOpened(false);
  }

  function handleOnDialogConfirm() {
    setIsLoading(true);
  }

  // Texts to be displayed on the screen
  const mainTitle = `Ruffle`;

  return (
    <motion.div
      className="relative grid w-full h-screen grid-flow-row grid-rows-[56px_minmax(auto,1fr)]"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* Overlay */}
      <AnimatePresence>
        {portalOpened && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 z-30 bg-white/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <Portal>
        <AnimatePresence>
          {portalOpened && (
            <div className="absolute inset-0 flex items-center justify-center ">
              {/* <Overlay /> */}
              <div className="absolute inset-0 z-[70]"></div>
              <motion.div className="z-[80] rounded-md overflow-hidden relative w-3/5 max-w-xl min-h-[20rem] min-w-min">
                <AnimatePresence>
                  {!isLoading ? (
                    <ConfirmBox
                      key={"confirmBox"}
                      total={ruffleData.itemMap.size}
                      pickSize={ruffleData.pickSize}
                      onConfirm={handleOnDialogConfirm}
                      onCancel={handleOnDialogCancel}
                    />
                  ) : (
                    <LoadingBox
                      key={"loadingBox"}
                      onCancel={handleOnDialogCancel}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
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
