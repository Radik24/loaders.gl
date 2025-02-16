// Forked from https://github.com/kbajalc/parquets under MIT license (Copyright (c) 2017 ironSource Ltd.)
import Int64 from 'node-int64';
import type {PageHeader} from '../parquet-thrift';

export type ParquetCodec = 'PLAIN' | 'RLE' | 'PLAIN_DICTIONARY';
export type ParquetCompression =
  | 'UNCOMPRESSED'
  | 'GZIP'
  | 'SNAPPY'
  | 'LZO'
  | 'BROTLI'
  | 'LZ4'
  | 'LZ4_RAW'
  | 'ZSTD';
export type RepetitionType = 'REQUIRED' | 'OPTIONAL' | 'REPEATED';
export type ParquetType = PrimitiveType | OriginalType;

/**
 * Physical type
 */
export type PrimitiveType =
  // Base Types
  | 'BOOLEAN' // 0
  | 'INT32' // 1
  | 'INT64' // 2
  | 'INT96' // 3
  | 'FLOAT' // 4
  | 'DOUBLE' // 5
  | 'BYTE_ARRAY' // 6,
  | 'FIXED_LEN_BYTE_ARRAY'; // 7

/**
 * Logical type
 */
export type OriginalType =
  // Converted Types
  | 'UTF8' // 0
  // | 'MAP' // 1
  // | 'MAP_KEY_VALUE' // 2
  // | 'LIST' // 3
  // | 'ENUM' // 4
  // | 'DECIMAL' // 5
  | 'DECIMAL_INT32' // 5
  | 'DECIMAL_INT64' // 5
  | 'DECIMAL_BYTE_ARRAY' // 5
  | 'DECIMAL_FIXED_LEN_BYTE_ARRAY' // 5
  | 'DATE' // 6
  | 'TIME_MILLIS' // 7
  | 'TIME_MICROS' // 8
  | 'TIMESTAMP_MILLIS' // 9
  | 'TIMESTAMP_MICROS' // 10
  | 'UINT_8' // 11
  | 'UINT_16' // 12
  | 'UINT_32' // 13
  | 'UINT_64' // 14
  | 'INT_8' // 15
  | 'INT_16' // 16
  | 'INT_32' // 17
  | 'INT_64' // 18
  | 'JSON' // 19
  | 'BSON' // 20
  | 'INTERVAL'; // 21

export type ParquetDictionary = string[];

export interface SchemaDefinition {
  [string: string]: FieldDefinition;
}

export interface FieldDefinition {
  type?: ParquetType;
  typeLength?: number;
  presision?: number;
  scale?: number;
  encoding?: ParquetCodec;
  compression?: ParquetCompression;
  optional?: boolean;
  repeated?: boolean;
  fields?: SchemaDefinition;
}

export interface ParquetField {
  name: string;
  path: string[];
  key: string;
  primitiveType?: PrimitiveType;
  originalType?: OriginalType;
  repetitionType: RepetitionType;
  typeLength?: number;
  presision?: number;
  scale?: number;
  encoding?: ParquetCodec;
  compression?: ParquetCompression;
  rLevelMax: number;
  dLevelMax: number;
  isNested?: boolean;
  fieldCount?: number;
  fields?: Record<string, ParquetField>;
}

/** @todo better name, this is an internal type? */
export interface ParquetOptions {
  type: ParquetType;
  rLevelMax: number;
  dLevelMax: number;
  compression: ParquetCompression;
  column: ParquetField;
  numValues?: Int64;
  dictionary?: ParquetDictionary;
}

export interface ParquetPageData {
  dlevels: number[];
  rlevels: number[];
  /** Actual column chunks */
  values: any[]; // ArrayLike<any>;
  count: number;
  dictionary?: ParquetDictionary;
  /** The "raw" page header from the file */
  pageHeader: PageHeader;
}

export interface ParquetRow {
  [key: string]: any;
}

/** @
 * Holds data for one row group (column chunks) */
export class ParquetRowGroup {
  /** Number of rows in this page */
  rowCount: number;
  /** Map of Column chunks */
  columnData: Record<string, ParquetColumnChunk>;

  constructor(rowCount: number = 0, columnData: Record<string, ParquetColumnChunk> = {}) {
    this.rowCount = rowCount;
    this.columnData = columnData;
  }
}

/** Holds the data for one column chunk */
export interface ParquetColumnChunk {
  dlevels: number[];
  rlevels: number[];
  values: any[];
  count: number;
  pageHeaders: PageHeader[];
}
