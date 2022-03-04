import React, { useState, VFC, KeyboardEvent, ChangeEvent } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Group, Grid, TextInput, Text } from "@mantine/core";
import Button from "@components/Button";
import { IoAdd, IoPlay, IoRemove } from "react-icons/io5";
import { ItemMap, sortMapByKey, sortMapByValue } from "lib/helper";
import { parseInput } from "lib/InputParser";
import CandidateListBox from "./CandidateListBox";
import Papa from "papaparse";

type Props = {
  onSubmit?: (data: { itemMap: ItemMap; pickSize: number }) => void;
  disabled?: boolean;
};

const mainVariants: Variants = {
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

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const SettingBox: VFC<Props> = ({ onSubmit = () => {}, disabled = false }) => {
  // A state to store current input
  const [item, setItem] = useState<string>("");
  const [csvFileName, setCsvFileName] = useState("");

  // A state to store item list
  // It is implemented with object so that frequencies are also stored
  const [itemMap, setItemMap] = useState<ItemMap>(new Map<string, number>());

  // A state to store pickSize
  const [pickSize, setPickSize] = useState<number>(0);

  //  CONST TEXTS
  const totalNumberText = `총 후보 갯수: ${itemMap.size}`;
  const submitText = "추첨하기";
  const addText = "추가";
  const inputPlaceholderText = "후보 이름을 입력하세요";
  const csvImportText = "CSV 파일 불러오기";

  function handleOnAdd() {
    // If nothing is entered, do nothing
    const candidate = item.trim();
    if (candidate === "") return;

    // TODO: Array handling will be implemented in the future
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

  function handleOnSortByCandidate() {
    setItemMap(sortMapByKey(itemMap));
  }

  function handleOnItemInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setItem(value);
  }

  function handleOnSortByFrequency() {
    setItemMap(sortMapByValue(itemMap));
  }

  function handleOnEnterPressed(event: KeyboardEvent<HTMLInputElement>) {
    // Add item when ENTER key is clicked.
    if (event.key == "Enter") handleOnAdd();
  }

  function handleOnPickSizeChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value.trim());
    if (isNaN(value)) return;
    if (value < 0) return;
    if (value > itemMap.size) return;

    setPickSize(value);
  }

  function handleOnFileUploaded(event: ChangeEvent<HTMLInputElement>) {
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

  function handleOnSubmit() {
    onSubmit({ itemMap, pickSize });
  }

  return (
    <motion.div
      variants={mainVariants}
      className={`relative flex w-3/5 min-w-max max-w-md flex-col overflow-hidden p-8 shadow-sm shadow-slate-300 ${
        disabled ? "select-none" : ""
      } `}
    >
      {/* Overlay */}
      <AnimatePresence>
        {disabled && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

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
            <Button fullWidth onClick={handleOnAdd}>
              {addText}
            </Button>
          </Grid.Col>
        </Grid>
        {/* CSV 파일 불러오기 박스 */}
        <div className="flex flex-row items-center gap-x-4 py-2">
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
        <div className="flex w-full flex-col items-start gap-x-4 py-2">
          <div>{totalNumberText}</div>
          <div className="row flex items-center gap-x-4">
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
                className="max-w-[40px] select-none rounded-md text-center"
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

        <Button onClick={handleOnSubmit} gradient size="large">
          <IoPlay />
          {submitText}
        </Button>
      </Group>
    </motion.div>
  );
};

export default SettingBox;
