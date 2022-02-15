import React, { ChangeEvent, useEffect } from "react";
import Papa from "papaparse";
const Test = () => {
  function handleOnFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      let content = evt.target?.result as string;
      let result = Papa.parse(content, { header: true });

      console.log("Result:", result.data);
    };
  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <label htmlFor="file">Upload File</label>
      <input
        onChange={handleOnFileSelected}
        id="file"
        type="file"
        accept=".csv"
      />
    </div>
  );
};

export default Test;
