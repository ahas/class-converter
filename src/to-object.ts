import { Type, TypeHelpOptions } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToObject = (
    typeFunction: (type?: TypeHelpOptions) => Function,
    converterOptions?: ConverterOptions,
): PropertyDecorator => {
    converterOptions = converterOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        IsObject()(target, propertyKey);
        Type(typeFunction)(target, propertyKey);
        applyOptions(target, propertyKey, converterOptions, typeFunction);
    };
};
