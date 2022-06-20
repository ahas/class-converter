import { Type } from "class-transformer";
import { IsInt, IsNumber, IsNumberOptions } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export type ToNumberOptions = IsNumberOptions &
    ConverterOptions & {
        int?: true;
    };

export const ToNumber = (toNumberOptions?: ToNumberOptions): PropertyDecorator => {
    toNumberOptions = toNumberOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        IsNumber(toNumberOptions, toNumberOptions)(target, propertyKey);
        Type(() => Number)(target, propertyKey);
        if (toNumberOptions.int) {
            IsInt(toNumberOptions)(target, propertyKey);
        }
        applyOptions(target, propertyKey, toNumberOptions);
    };
};
