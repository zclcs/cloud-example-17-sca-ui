/**
 * BaseRsp，消息响应格式
 */
export interface UploadApiResult {
  data: MinioFile;
  /**
   * 响应消息
   */
  msg: string;
}

/**
 * MinioFile对象，文件
 */
export interface MinioFile {
  bucketId: number;
  /**
   * 创建时间
   */
  createAt: Date;
  /**
   * 创建人
   */
  createBy: string;
  fileName: string;
  filePath: string;
  id: string;
  originalFileName: string;
}
