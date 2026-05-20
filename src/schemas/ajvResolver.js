import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
// Install extra packages:
// npm install ajv-formats ajv-errors
const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
addErrors(ajv);
export function ajvResolver(schema) {
  return async (data) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (valid) return { values: data, errors: {} };
    const errors = {};
    validate.errors?.forEach((err) => {
      const field =
        err.instancePath.replace("/", "") || err.params?.missingProperty;
      if (field) errors[field] = { message: err.message };
    });
    return { values: {}, errors };
  };
}
