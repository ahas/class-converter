import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToString = (
    converterOptions?: ConverterOptions,
): PropertyDecorator => {
    converterOptions = converterOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        Type(() => String)(target, propertyKey);

        if (converterOptions.validate) {
            IsString(converterOptions,)(target, propertyKey);
        }

        applyOptions(target, propertyKey, converterOptions);
    };
};
