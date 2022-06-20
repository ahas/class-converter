import { ApiProperty } from "@nestjs/swagger";
import { TypeHelpOptions } from "class-transformer";
import { IsOptional, ValidateNested, ValidationOptions } from "class-validator";

export interface ConverterOptions extends ValidationOptions {
    optional?: boolean;
    api?: boolean;
    nested?: boolean;
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
}
