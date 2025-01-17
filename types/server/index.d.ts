// Declaration file for Javascript Split Software SDK
// Project: http://www.split.io/

/// <reference path="../splitio.d.ts" />
export = JsSdk;

declare module JsSdk {
  /**
   * Split.io sdk factory function.
   * The settings parameter should be an object that complies with the SplitIO.INodeAsyncSettings.
   * For more information read the corresponding article: @see {@link https://help.split.io/hc/en-us/articles/360020564931-Node-js-SDK#configuration}
   */
  export function SplitFactory(settings: SplitIO.INodeAsyncSettings): SplitIO.IAsyncSDK;
  /**
   * Split.io sdk factory function.
   * The settings parameter should be an object that complies with the SplitIO.INodeSettings.
   * For more information read the corresponding article: @see {@link https://help.split.io/hc/en-us/articles/360020564931-Node-js-SDK#configuration}
   */
  export function SplitFactory(settings: SplitIO.INodeSettings): SplitIO.ISDK;
}
