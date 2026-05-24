declare module 'qrcode' {
  const QRCode: {
    toCanvas(
      canvas: HTMLCanvasElement,
      text: string,
      options?: {
        width?: number
        margin?: number
        color?: { dark?: string; light?: string }
      }
    ): Promise<void>
  }
  export default QRCode
}
