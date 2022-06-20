import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToString = (
    converterOptions?: ConverterOptions,
): PropertyDecorator => {
    converterOptions = converterOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        IsString(converterOptions,)(target, propertyKey);
        Type(() => String)(target, propertyKey);
        applyOptions(target, propertyKey, converterOptions);
    };
};
