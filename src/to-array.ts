import { Type, TypeHelpOptions } from "class-transformer";
import { IsArray } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToArray = (
    typeFunction?: (type?: TypeHelpOptions) => Function,
    converterOptions?: ConverterOptions,
): PropertyDecorator => {
    converterOptions = converterOptions || {};
    converterOptions.each = true;

    return function (target: Object, propertyKey: string | symbol): void {
        IsArray()(target, propertyKey);
        Type(typeFunction)(target, propertyKey);
        applyOptions(target, propertyKey, converterOptions);
    };
};
