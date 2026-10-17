import seedBatchA01 from "./batches/trwiki-a-01.json";
import seedBatchA02 from "./batches/trwiki-a-02.json";
import seedBatchA03 from "./batches/trwiki-a-03.json";
import seedBatchA04 from "./batches/trwiki-a-04.json";
import seedBatchB01 from "./batches/trwiki-b-01.json";
import seedBatchC01 from "./batches/trwiki-c-01.json";
import seedBatchCCedilla01 from "./batches/trwiki-c-cedilla-01.json";
import seedBatchD01 from "./batches/trwiki-d-01.json";
import seedBatchE01 from "./batches/trwiki-e-01.json";
import seedBatchF01 from "./batches/trwiki-f-01.json";
import seedBatchG01 from "./batches/trwiki-g-01.json";
import seedBatchH01 from "./batches/trwiki-h-01.json";
import seedBatchIDotless01 from "./batches/trwiki-i-dotless-01.json";
import seedBatchIDotted01 from "./batches/trwiki-i-dotted-01.json";
import seedBatchJ01 from "./batches/trwiki-j-01.json";
import seedBatchK01 from "./batches/trwiki-k-01.json";
import seedBatchK02 from "./batches/trwiki-k-02.json";
import seedBatchL01 from "./batches/trwiki-l-01.json";
import seedBatchM01 from "./batches/trwiki-m-01.json";
import seedBatchN01 from "./batches/trwiki-n-01.json";

const seedBatchA03ForExplorer = {
  ...seedBatchA03,
  rows: seedBatchA03.rows.map((row) =>
    row.canonicalName === "Arslantepe Höyüğü"
      ? { ...row, canonicalName: "Arslantepe" }
      : row,
  ),
};

const seedBatchE01ForExplorer = {
  ...seedBatchE01,
  rows: seedBatchE01.rows.map((row) =>
    row.canonicalName === "Efes"
      ? { ...row, canonicalName: "Ephesus" }
      : row,
  ),
};

const seedBatchG01ForExplorer = {
  ...seedBatchG01,
  rows: seedBatchG01.rows.map((row) =>
    row.canonicalName === "Göbeklitepe"
      ? { ...row, canonicalName: "Göbekli Tepe" }
      : row,
  ),
};

const seedBatchH01ForExplorer = {
  ...seedBatchH01,
  rows: seedBatchH01.rows.map((row) =>
    row.canonicalName === "Hattuşaş"
      ? { ...row, canonicalName: "Hattusa" }
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
  seedBatchE01ForExplorer,
  seedBatchF01,
  seedBatchG01ForExplorer,
  seedBatchH01ForExplorer,
  seedBatchIDotless01,
  seedBatchIDotted01,
  seedBatchJ01,
  seedBatchK01,
  seedBatchK02,
  seedBatchL01,
  seedBatchM01,
  seedBatchN01,
] as const;
