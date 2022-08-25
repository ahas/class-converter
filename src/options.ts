import { ApiProperty } from "@nestjs/swagger";
import { Exclude, ExcludeOptions, Expose, ExposeOptions, TypeHelpOptions } from "class-transformer";
import { IsEmpty, IsOptional, ValidateNested, ValidationOptions } from "class-validator";

export interface ConverterOptions extends ValidationOptions {
    optional?: boolean;
    api?: boolean;
    nested?: boolean;
    empty?: boolean;
    exclude?: ExcludeOptions | boolean;
    expose?: ExposeOptions | boolean;
}

export function applyOptions(
    target: object,
    propertyKey: string | symbol,
    options: ConverterOptions,
    typeFunction?: (type?: TypeHelpOptions) => Function,
) {
    if (options.nested) {
        ValidateNested(options)(target, propertyKey);
    }

    if (options.optional) {
        IsOptional()(target, propertyKey);
    }

    if (options.api) {
        ApiProperty({ required: !options.optional, type: typeFunction?.() })(target, propertyKey);
    }

    if (options.exclude) {
        Exclude(typeof options.exclude === "object" ? options.exclude : undefined)(target, propertyKey);
    }

    if (options.expose) {
        Expose(typeof options.expose === "object" ? options.expose : undefined)(target, propertyKey);
    }

    if (options.empty) {
        IsEmpty(options)(target, propertyKey);
    }
}
