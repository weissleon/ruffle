import type { NextPage } from "next";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import {
  generateWinnerList,
  ItemMap,
  sortMapByKey,
  sortMapByValue,
} from "../lib/helper";
import CandidateListBox from "../components/CandidateListBox";
import { useRuffleData } from "../hooks/RuffleDataContext";
import { IoAdd, IoPlay, IoRemove } from "react-icons/io5";
import { motion, Variants } from "framer-motion";
import Papa from "papaparse";
import { Grid, Group, Paper, TextInput, Text } from "@mantine/core";
import AppBar from "@components/AppBar";
import Button from "@components/Button";
import { parseInput } from "lib/InputParser";

const Home: NextPage = () => {
  // Create router
  const router = useRouter();
  const { setRuffleData } = useRuffleData();

  // A state to store current input
  const [item, setItem] = useState<string>("");
  const [csvFileName, setCsvFileName] = useState("");

  // A state to store item list
  // It is implemented with object so that frequencies are also stored
  const [itemMap, setItemMap] = useState<ItemMap>(new Map<string, number>());

  // A state to store pickSize
  const [pickSize, setPickSize] = useState<number>(0);

  // * HANDLERS
  function handleAdd() {
    // If nothing is entered, do nothing
    const candidate = item.trim();
    if (candidate === "") return;

    const candidateArray = parseInput(item.trim());

    // Update itemList
    setItemMap((prev) => {
      const newMap = new Map(prev);

      if (prev.has(candidate)) newMap.set(candidate, prev.get(candidate)! + 1);
      else newMap.set(candidate, 1);
      return newMap;
    });

    // Clean up textField
    setItem("");
  }

  function handleSubmit() {
    if (pickSize === 0) return;

    const winnerList = generateWinnerList(itemMap, pickSize);

    setRuffleData((draft) => ({
      ...draft,
      winnerList,
    }));

    setRuffleData((draft) => {
      draft.itemMap = itemMap;
      draft.pickSize = pickSize;
      draft.winnerList = winnerList;
    });

    router.push({
      pathname: "/result",
    });
  }

  function handleOnSortByCandidate() {
    setItemMap(sortMapByKey(itemMap));
  }

  function handleOnSortByFrequency() {
    setItemMap(sortMapByValue(itemMap));
  }

  function handleOnItemInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setItem(value);
  }

  function handleOnEnterPressed(event: KeyboardEvent<HTMLInputElement>) {
    // Add item when ENTER key is clicked.
    if (event.key == "Enter") handleAdd();
  }

  function handleOnPickSizeChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value.trim());
    if (isNaN(value)) return;
    if (value < 0) return;
    if (value > itemMap.size) return;

    setPickSize(value);
  }

  function handleOnFileUploaded(event: ChangeEvent<HTMLInputElement>) {
    console.log("Called!");
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return setCsvFileName("");

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      const rawText = evt.target ? (evt.target.result as string) : null;
      if (!rawText) return;

      const result = Papa.parse<{ Name: string; Frequency: number }>(rawText, {
        header: true,
      });

      const tempMap = new Map(itemMap);
      result.data.forEach((datum) => {
        const [name, frequency] = Object.values(datum) as string[];
        if (tempMap.get(name))
          tempMap.set(name, tempMap.get(name)! + parseInt(frequency));
        else tempMap.set(name, parseInt(frequency));
      });

      setItemMap(tempMap);
    };

    setCsvFileName(file.name);

    event.target.value = "";
  }

  function handleOnPickSizeIncrement() {
    if (pickSize === itemMap.size) return;
    setPickSize((prev) => prev + 1);
  }

  function handleOnPickSizeDecrement() {
    if (pickSize <= 0) return;
    setPickSize((prev) => prev - 1);
  }

  function handleOnRemoveItem(item: string) {
    setItemMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(item);
      return newMap;
    });
  }

  function handleOnFreqIncrement(item: string) {
    setItemMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(item, prev.get(item)! + 1);
      return newMap;
    });
  }

  function handleOnFreqDecrement(item: string) {
    setItemMap((prev) => {
      const newMap = new Map(prev);
      if (prev.get(item) === 1) newMap.delete(item);
      else newMap.set(item, prev.get(item)! - 1);

      return newMap;
    });
  }

  // numbers
  const headerHeight = 56;

  // Texts to be displayed on the screen
  const mainTitle = `Ruffle`;
  const totalNumberText = `총 후보 갯수: ${itemMap.size}`;
  const submitText = "추첨하기";
  const addText = "추가";
  const inputPlaceholderText = "후보 이름을 입력하세요";
  const csvImportText = "CSV 파일 불러오기";

  const mainPageVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    exit: {
      y: 0,
      opacity: 0,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="relative grid w-full h-screen grid-flow-row grid-rows-[56px_minmax(auto,1fr)]"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <AppBar title={mainTitle} />
      <motion.main className="flex items-center justify-center py-4">
        {/* 컨텐트박스 */}
        <motion.div
          variants={mainPageVariants}
          className="flex flex-col w-3/5 max-w-md p-8 shadow-sm min-w-max shadow-slate-300"
        >
          <Group spacing={8} direction="column" grow>
            {/* 인풋박스 */}

            <Grid>
              <Grid.Col span={8}>
                <TextInput
                  value={item}
                  onChange={handleOnItemInputChange}
                  onKeyPress={handleOnEnterPressed}
                  placeholder={inputPlaceholderText}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Button fullWidth onClick={handleAdd}>
                  {addText}
                </Button>
              </Grid.Col>
            </Grid>
            {/* CSV 파일 불러오기 박스 */}
            <div className="flex flex-row items-center py-2 gap-x-4">
              <Button component="label" htmlFor="csv-import">
                {csvImportText}
              </Button>
              <input
                type="file"
                onChange={handleOnFileUploaded}
                className="hidden"
                id="csv-import"
                accept=".csv"
              />
              <div>{csvFileName}</div>
            </div>
            <CandidateListBox
              candidateList={itemMap}
              handleOnFreqDecrement={handleOnFreqDecrement}
              handleOnFreqIncrement={handleOnFreqIncrement}
              handleOnRemoveItem={handleOnRemoveItem}
              handleOnSortByCandidate={handleOnSortByCandidate}
              handleOnSortByFrequency={handleOnSortByFrequency}
            />
            <div className="flex flex-col items-start w-full py-2 gap-x-4">
              <div>{totalNumberText}</div>
              <div className="flex items-center row gap-x-4">
                <Text>추첨갯수: </Text>
                <div className="flex gap-x-2">
                  <Button
                    gradient
                    disabled={pickSize === 0}
                    onClick={handleOnPickSizeDecrement}
                  >
                    <IoRemove />
                  </Button>
                  <input
                    value={pickSize}
                    className="max-w-[40px] text-center rounded-md"
                    type="text"
                    onChange={handleOnPickSizeChange}
                  />
                  <Button
                    gradient
                    disabled={pickSize === itemMap.size}
                    onClick={handleOnPickSizeIncrement}
                  >
                    <IoAdd />
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleSubmit} gradient size="large">
              <IoPlay />
              {submitText}
            </Button>
          </Group>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default Home;
