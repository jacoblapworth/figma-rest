import type { File } from '../models/api.js'
import { Component, Style } from '../models/ast.js'
import { BaseResource } from './base.js'

type FileParams = {
  /** A specific version ID to get. Omitting this will get the current version of the file */
  version?: string
  /** Comma separated list of nodes that you care about in the document. If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes */
  ids?: string[]
  /** Positive integer representing how deep into the document tree to traverse. For example, setting this to 1 returns only Pages, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes */
  depth?: number
  /** Set to "paths" to export vector data */
  geometry?: string
  /** A comma separated list of plugin IDs and/or the string "shared". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties. */
  plugin_data?: string
  /** Returns branch metadata for the requested file. If the file is a branch, the main file's key will be included in the returned response. If the file has branches, their metadata will be included in the returned response. Default: false. */
  branch_data?: boolean
}

type FileResponse = File

type ImageParams = {
  /** A comma separated list of node IDs to render */
  ids: string[]
  /** A number between 0.01 and 4, the image scaling factor */
  scale?: number
  /** A string enum for the image output format, can be jpg, png, svg, or pdf */
  format?: ImageFormat
  /**
   * Whether to include id attributes for all SVG elements.
   * @default false
   */
  svg_include_id?: boolean
  /**
   * Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>.
   * @default true
   */
  svg_simplify_stroke?: boolean
  /**
   * Use the full dimensions of the node regardless of whether or not it is cropped or the space around it is empty. Use this to export text nodes without cropping.
   * @default false
   * */
  use_absolute_bounds?: boolean
  /** A specific version ID to use. Omitting this will use the current version of the file */
  version?: string
}

type ImageFormat = 'jpg' | 'png' | 'svg' | 'pdf'

type ImagesResponse =
  | {
      err: string
      status: Number
    }
  | {
      images: Record<string, string>
    }

type ImageFillsResponse = {
  images: Record<string, string>
}

type NodesParams = {
  ids: string[]
}

type FileNodesResponse = {
  name: String
  role: String
  lastModified: String
  editorType: String
  thumbnailUrl: String
  err: String
  nodes: {
    id: {
      document: Node
      components: Map<String, Component>
      schemaVersion: 0
      styles: Map<String, Style>
    }
  }
}

/**
 * Every file in Figma consists of a tree of nodes.
 * At the root of every file is a DOCUMENT node, and from that node stems any CANVAS nodes.
 * Every canvas node represents a PAGE in a Figma file.
 * A canvas node can then have any number of nodes as its children.
 * Each subtree stemming from a canvas node will represent a layer (e.g an object) on the canvas.
 *
 * Nodes have a number of properties associated with them.
 * Some of these are global properties, that exist on every node,
 * whereas other node properties will be specific to the type of node.
 */
export class FilesResource extends BaseResource {
  /**
   * Returns the document referred to by :key as a JSON object.
   * The file key can be parsed from any Figma file url: https://www.figma.com/file/:key/:title.
   * The name, lastModified, thumbnailUrl, editorType, linkAccess, and version attributes are all metadata of the retrieved file. The document attribute contains a Node of type DOCUMENT.
   *
   * The components key contains a mapping from node IDs to component metadata.
   * This is to help you determine which components each instance comes from.
   */
  public async get(
    fileKey: string,
    { ids, ...rest }: FileParams
  ): Promise<File> {
    const searchParams = { ...rest, ids: ids?.join(',') }
    return this._client.request
      .get(`v1/files/${fileKey}`, { searchParams })
      .json<FileResponse>()
  }

  /**
   * Renders images from a file.
   * If no error occurs, "images" will be populated with a map from node IDs to URLs of the rendered images, and "status" will be omitted.
   * The image assets will expire after 30 days.
   * Images up to 32 megapixels can be exported.
   * Any images that are larger will be scaled down.
   */
  public async image(fileKey: string, { ids, ...rest }: ImageParams) {
    const searchParams = { ...rest, ids: ids.join(',') }
    const response = await this._client.request
      .get(`v1/images/${fileKey}`, { searchParams })
      .json<ImagesResponse>()

    if ('images' in response) return response.images
  }

  /**
   * Returns download links for all images present in image fills in a document.
   * Image fills are how Figma represents any user supplied images.
   * When you drag an image into Figma, we create a rectangle with a single fill that represents the image, and the user is able to transform the rectangle (and properties on the fill) as they wish.
   *
   * This endpoint returns a mapping from image references to the URLs at which the images may be download.
   * Image URLs will expire after no more than 14 days.
   * Image references are located in the output of the GET files endpoint under the imageRef attribute in a Paint.
   */
  public async imageFills(fileKey: string) {
    const response = await this._client.request
      .get(`v1/files/${fileKey}/images`)
      .json<ImageFillsResponse>()

    return response.images
  }
}
