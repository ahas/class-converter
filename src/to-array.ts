import { Transform, Type, TypeHelpOptions } from "class-transformer";
import { IsArray } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

const valueToArray = (value: any) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    if (["empty", "[]"].includes(value.toLowerCase())) {
        return [];
    }

    return undefined;
};

export const ToArray = (
    typeFunction?: (type?: TypeHelpOptions) => Function,
    converterOptions?: ConverterOptions,
): PropertyDecorator => {
    converterOptions = converterOptions || {};
    converterOptions.each = true;

    const toPlain: PropertyDecorator = Transform(
        ({ value }) => {
            return value;
        },
        {
            toPlainOnly: true,
        },
    );
    const toClass: PropertyDecorator = (target: object, propertyKey: string | symbol) => {
        return Transform(
            ({ obj }) => {
                return valueToArray(obj[propertyKey]);
            },
            {
                toClassOnly: true,
            },
        )(target, propertyKey);
    };
    return function (target: Object, propertyKey: string | symbol): void {
        Type(typeFunction)(target, propertyKey);
        toPlain(target, propertyKey);
        toClass(target, propertyKey);
        IsArray()(target, propertyKey);

        applyOptions(target, propertyKey, converterOptions);
    };
};
