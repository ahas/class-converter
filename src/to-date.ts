import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToDate = (converterOptions?: ConverterOptions): PropertyDecorator => {
    converterOptions = converterOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        IsDate(converterOptions)(target, propertyKey);
        Type(() => Date)(target, propertyKey);
        applyOptions(target, propertyKey, converterOptions);
    };
};
