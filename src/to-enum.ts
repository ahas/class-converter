import { IsEnum } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToEnum = (
    entity: object,
    converterOptions?: ConverterOptions,
): PropertyDecorator => {
    converterOptions = converterOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        IsEnum(entity, converterOptions)(target, propertyKey);
        applyOptions(target, propertyKey, converterOptions);
    };
};
