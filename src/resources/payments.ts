import { BaseResource } from './base.js'

/** An object describing a user's payment information for a plugin, widget, or Community file. */
type PaymentInformation = {
  /** The ID of the user whose payment information was queried. Can be used to verify the validity of a response. */
  user_id: string
  /**
   * The ID of the plugin, widget, or Community file that was queried.
   * Can be used to verify the validity of a response.
   */
  resource_id: string
  /** The type of the resource. */
  resource_type: 'PLUGIN' | 'WIDGET' | 'COMMUNITY_FILE'
  /** The user's payment status on the resource. */
  payment_status: PaymentStatus
  date_of_purchase: string
  /** The UTC ISO 8601 timestamp indicating when the user purchased the resource. No value is given if the user has never purchased the resource.
   
  Note that a value will still be returned if the user had purchased the resource, but no longer has active access to it (e.g. purchase refunded, subscription ended). */
  /** An object describing the user's payment status. */
}
/** An object describing the user's payment status. */
type PaymentStatus = {
  /**
   * The current payment status of the user on the resource, as a string enum
   * Note that querying your own resource will return as "UNPAID".
   * Additionally, the returned payment status does not update according to setPaymentStatusInDevelopment usage.
   * */
  type: /** user has not paid for the resource */
  | 'UNPAID'
    /** user has an active purchase on the resource */
    | 'PAID'
    /** user is in the trial period for a subscription resource */
    | 'TRIAL'
}

type TokenPaymentParams = {
  /**
   * Short-lived token returned from "getPluginPaymentTokenAsync" in the plugin payments API and used to authenticate to this endpoint.
   * Read more about generating this token through "Calling the Payments REST API from a plugin or widget" below. */
  plugin_payment_token: string
}

type UserAndResourcePaymentParams = {
  user_id: number
  /** The ID of the user to query payment information about. You can get the user ID by having the user OAuth2 to the Figma REST API. */
  community_file_id: number
  /** The ID of the Community file to query a user's payment information on. You can get the Community file ID from the file's Community page (look for the number after "file/" in the URL). Provide exactly one of "community_file_id", "plugin_id", or "widget_id". */
  plugin_id: number
  /** The ID of the plugin to query a user's payment information on. You can get the plugin ID from the plugin's manifest, or from the plugin's Community page (look for the number after "plugin/" in the URL). Provide exactly one of "community_file_id", "plugin_id", or "widget_id". */
  widget_id: number
  /** The ID of the widget to query a user's payment information on. You can get the widget ID from the widget's manifest, or from the widget's Community page (look for the number after "widget/" in the URL). Provide exactly one of "community_file_id", "plugin_id", or "widget_id". */
}

type PaymentParams = TokenPaymentParams | UserAndResourcePaymentParams

type PaymentResponse = PaymentInformation

/**
 *
 */
export class PaymentsResource extends BaseResource {
  /**
   * Returns the document referred to by :key as a JSON object.
   * The file key can be parsed from any Figma file url: https://www.figma.com/file/:key/:title.
   * The name, lastModified, thumbnailUrl, editorType, linkAccess, and version attributes are all metadata of the retrieved file. The document attribute contains a Node of type DOCUMENT.
   *
   * The components key contains a mapping from node IDs to component metadata.
   * This is to help you determine which components each instance comes from.
   */
  public async get(searchParams: PaymentParams): Promise<PaymentInformation> {
    return this._client.request
      .get(`v1/payments`, { searchParams })
      .json<PaymentResponse>()
  }
}
