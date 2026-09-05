import seedBatchA01 from "./batches/trwiki-a-01.json";
import seedBatchA02 from "./batches/trwiki-a-02.json";
import seedBatchA03 from "./batches/trwiki-a-03.json";
import seedBatchA04 from "./batches/trwiki-a-04.json";
import seedBatchB01 from "./batches/trwiki-b-01.json";
import seedBatchC01 from "./batches/trwiki-c-01.json";
import seedBatchCCedilla01 from "./batches/trwiki-c-cedilla-01.json";
import seedBatchD01 from "./batches/trwiki-d-01.json";

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
  seedBatchC01,
  seedBatchCCedilla01,
  seedBatchD01,
] as const;
