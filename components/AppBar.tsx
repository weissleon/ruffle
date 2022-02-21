import { Center, type TextProps, Paper, Text } from "@mantine/core";
import React, { VFC } from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  title: string;
  showTitle?: boolean;
};

const MotionText = motion<TextProps<"div">>(Text);
const appBarVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
  },
};

const AppBar: VFC<Props> = ({ title, showTitle = true }) => {
  return (
    <motion.div
      variants={appBarVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <Paper sx={{ height: 56 }} shadow={"xs"}>
        <Center sx={{ height: "100%", alignItems: "center" }}>
          {showTitle ? (
            <MotionText
              layoutId="title"
              size="xl"
              weight="bold"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              Ruffle
            </MotionText>
          ) : null}
        </Center>
      </Paper>
    </motion.div>
  );
};

export default AppBar;
