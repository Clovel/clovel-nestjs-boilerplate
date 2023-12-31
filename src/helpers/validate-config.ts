/* Module imports ------------------------------------- */
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

/* Type imports ---------------------------------------- */
import type { ClassConstructor } from 'class-transformer/types/interfaces';

/* Config validator helper ----------------------------- */
export const validateConfig = <T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
): T => {
  const validatedConfig = plainToClass(
    envVariablesClass,
    config,
    {
      enableImplicitConversion: true,
    }
  );

  const errors = validateSync(
    validatedConfig,
    {
      skipMissingProperties: false,
    }
  );

  if(errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
