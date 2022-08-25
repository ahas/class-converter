import { Transform, Type } from "class-transformer";
import { IsBoolean } from "class-validator";
import { applyOptions, ConverterOptions } from "./options";

const valueToBoolean = (value: any) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "boolean") {
        return value;
    }
    if (["true", "on", "yes", "Y", "1"].includes(value.toLowerCase())) {
        return true;
    }
    if (["false", "off", "no", "N", "0"].includes(value.toLowerCase())) {
        return false;
    }
    return undefined;
};

export const ToBoolean = (converterOptions?: ConverterOptions): PropertyDecorator => {
    converterOptions = converterOptions || {};

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
                return valueToBoolean(obj[propertyKey]);
            },
            {
                toClassOnly: true,
            },
        )(target, propertyKey);
    };
    return function (target: object, propertyKey: string | symbol): void {
        IsBoolean(converterOptions)(target, propertyKey);
        Type(() => Boolean)(target, propertyKey);
        toPlain(target, propertyKey);
        toClass(target, propertyKey);
        applyOptions(target, propertyKey, converterOptions);
    };
};
