import { Type, TypeHelpOptions } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

export const ToObject = (
    typeFunction: (type?: TypeHelpOptions) => Function,
    converterOptions?: ConverterOptions,
): PropertyDecorator => {
    converterOptions = converterOptions || {};

    return function (target: object, propertyKey: string | symbol): void {
        Type(typeFunction)(target, propertyKey);
        IsObject()(target, propertyKey);
        applyOptions(target, propertyKey, converterOptions, typeFunction);
    };
};
