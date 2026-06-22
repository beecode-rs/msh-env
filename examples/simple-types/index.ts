import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { mshEnv, mshEnvResolver } from '@beecode/msh-env'
import * as dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load the variables from the .env file sitting next to this script into process.env.
dotenv.config({ path: `${__dirname}/.env` })

// `mshEnv()` returns a builder used to describe each variable you want to read.
const env = mshEnv()

// Describe every variable you need.
//
// Type (REQUIRED by default — throws if missing):
//   .string | .number | .boolean | .json() | .base64
//
// Modifiers (chainable on any type):
//   .optional        -> value may be missing; resolved type becomes `T | undefined`
//   .default(value)  -> use `value` when the variable is not defined
//   .allowed(...vals)-> value must equal one of the listed values
const config = mshEnvResolver({
	// --- every type, REQUIRED (an error is thrown if these are missing) ---
	requiredString: env('SIMPLE_STRING').string,
	requiredNumber: env('SIMPLE_NUMBER').number,
	requiredBoolean: env('SIMPLE_BOOLEAN').boolean,
	requiredJson: env('SIMPLE_JSON').json<{ key: string; nested: { n: number } }>(),
	requiredBase64: env('SIMPLE_BASE64').base64,

	// --- OPTIONAL: present, so the value is resolved ---
	optionalPresent: env('OPTIONAL_STRING').string.optional,
	// --- OPTIONAL: missing, so it resolves to `undefined` ---
	optionalMissing: env('OPTIONAL_MISSING_STRING').string.optional,

	// --- DEFAULT: missing, so the provided default is used ---
	defaultString: env('DEFAULT_MISSING_STRING').string.default('fallback-string'),
	defaultNumber: env('DEFAULT_MISSING_NUMBER').number.default(0),

	// --- ALLOWED: value must be one of the listed options ---
	allowedString: env('ALLOWED_STRING').string.allowed('dev', 'prod', 'test'),
	allowedNumber: env('ALLOWED_NUMBER').number.allowed(1, 2, 3),
})

// The resolver returns a fully typed, deeply frozen object.
console.log('--- Resolved environment config (JSON) ---')
console.log(JSON.stringify(config, null, 2))

console.log('\n--- Individual values ---')
console.log('requiredString  :', config.requiredString)
console.log('requiredNumber  :', config.requiredNumber)
console.log('requiredBoolean :', config.requiredBoolean)
console.log('requiredJson    :', config.requiredJson)
console.log('requiredBase64  :', config.requiredBase64)
console.log('optionalPresent :', config.optionalPresent)
console.log('optionalMissing :', config.optionalMissing)
console.log('defaultString   :', config.defaultString)
console.log('defaultNumber   :', config.defaultNumber)
console.log('allowedString   :', config.allowedString)
console.log('allowedNumber   :', config.allowedNumber)
