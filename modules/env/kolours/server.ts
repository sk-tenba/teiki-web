import { IS_NEXT_BUILD, never } from "../server";
import { parseStringByRegex } from "../utils/parsers";
import { parseEnv$Optional } from "../utils/wrappers";

import { createSecretKey } from "@/modules/crypt";

export const KOLOURS_FEE_ADDRESS = IS_NEXT_BUILD
  ? never()
  : parseEnv$Optional({
      label: "KOLOURS_FEE_ADDRESS",
      input: process.env.KOLOURS_FEE_ADDRESS,
      parser: parseStringByRegex(/^addr_[0-9a-z]+$/),
      defaultValue: null,
    });

export const KOLOURS_HMAC_SECRET = IS_NEXT_BUILD
  ? never()
  : parseEnv$Optional({
      label: "KOLOURS_HMAC_SECRET",
      input: process.env.KOLOURS_HMAC_SECRET,
      parser: (text) =>
        createSecretKey("hmac", parseStringByRegex(/^[ -~]+$/)(text)),
      defaultValue: null,
    });

export const KOLOURS_PRODUCER_PRIVATE_KEY = parseEnv$Optional({
  label: "KOLOURS_PRODUCER_PRIVATE_KEY",
  input: process.env.KOLOURS_PRODUCER_PRIVATE_KEY,
  parser: parseStringByRegex(/^ed25519_sk[0-9A-Za-z]+$/),
  defaultValue: null,
});
