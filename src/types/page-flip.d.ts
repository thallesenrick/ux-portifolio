declare module "page-flip" {
  export class PageFlip {
    constructor(element: HTMLElement, settings: {
      width: number; height: number; size: "fixed" | "stretch"; startPage?: number;
      usePortrait?: boolean; showCover?: boolean; drawShadow?: boolean;
      flippingTime?: number; maxShadowOpacity?: number; autoSize?: boolean;
      mobileScrollSupport?: boolean; clickEventForward?: boolean;
      useMouseEvents?: boolean; showPageCorners?: boolean; disableFlipByClick?: boolean; swipeDistance?: number;
    });
    on(event: string, callback: (event: { data: number | string | boolean | object; object: PageFlip }) => void): PageFlip;
    loadFromHTML(elements: HTMLElement[]): void;
    getCurrentPageIndex(): number;
    turnToPrevPage(): void;
    turnToNextPage(): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flipNext(corner?: "top" | "bottom"): void;
    destroy(): void;
  }
}
