declare interface Window {
    /**
     * websql
     * @param name 数据库名称
     * @param version 版本号
     * @param declare 描述
     * @param databaseSize 数据库大小
     */
    openDatabase: (name: string, version: string, describe: string, databaseSize: number) => void

}
