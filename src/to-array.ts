import { ClassConstructor, Transform, Type, TypeHelpOptions } from "class-transformer";
import { IsArray } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";
import { plainToInstance } from "class-transformer";

const valueToArray = (value: any) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === "string" && ["empty", "[]"].includes(value.toLowerCase())) {
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

    const toPlain: PropertyDecorator = Transform(({ value }) => value, { toPlainOnly: true });
    const toClass: PropertyDecorator = (target: object, propertyKey: string | symbol) =>
        Transform(
            ({ obj }) =>
                valueToArray(obj[propertyKey]).map((x) =>
                    plainToInstance(typeFunction() as ClassConstructor<unknown>, x),
                ),
            { toClassOnly: true },
        )(target, propertyKey);
    return function (target: Object, propertyKey: string | symbol): void {
        toPlain(target, propertyKey);
        toClass(target, propertyKey);

        applyOptions(target, propertyKey, converterOptions);
    };
};
