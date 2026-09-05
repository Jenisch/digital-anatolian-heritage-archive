import seedBatchA01 from "./batches/trwiki-a-01.json";
import seedBatchA02 from "./batches/trwiki-a-02.json";
import seedBatchA03 from "./batches/trwiki-a-03.json";
import seedBatchA04 from "./batches/trwiki-a-04.json";
import seedBatchB01 from "./batches/trwiki-b-01.json";

const seedBatchA03ForExplorer = {
  ...seedBatchA03,
  rows: seedBatchA03.rows.map((row) =>
    row.canonicalName === "Arslantepe Höyüğü"
      ? { ...row, canonicalName: "Arslantepe" }
      : row,
  ),
};

export const registrySeedBatches = [
  seedBatchA01,
  seedBatchA02,
  seedBatchA03ForExplorer,
  seedBatchA04,
  seedBatchB01,
] as const;
