import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToDate = (converterOptions?: ConverterOptions): PropertyDecorator => {
    converterOptions = converterOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        Type(() => Date)(target, propertyKey);
        IsDate(converterOptions)(target, propertyKey);

        applyOptions(target, propertyKey, converterOptions);
    };
};
