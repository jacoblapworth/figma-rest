import { Color } from './ast.js'

export type Action = 'CREATE' | 'UPDATE' | 'DELETE'

export type VariableType = 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR'
export type VariableValue = boolean | number | string | Color

/** Contains a variable alias. */
export type VariableAlias = {
  /** Value is always VARIABLE_ALIAS */
  type: 'VARIABLE_ALIAS'
  /** The id of the variable that the current variable is aliased to. This variable can be a local or remote variable, and both can be retrieved via the GET /v1/files/:file_key/variables/local endpoint. */
  id: string
}

/** An object that contains details about the desired VariableCollection change. */
export type VariableCollection = {
  /** CREATE, UPDATE, or DELETE, depending on the action you want to perform. Always required. */
  action: Action
  /** Required for UPDATE or DELETE, optional for CREATE. This is the id of the target variable collection. For CREATE, you can provide a temporary id. */
  id?: string
  /** Required for CREATE, optional for UPDATE. The name of the variable collection. */
  name?: string
  /** Optional for CREATE. The initial mode refers to the mode that is created by default. You can set a temporary id here, in order to reference this mode later in this request. */
  initialModeId?: string
}

/** An object that contains details about the desired variable mode change. */
export type VariableMode = {
  /** CREATE, UPDATE, or DELETE, depending on the action you want to perform. Always required. */
  action: Action
  /** Required for UPDATE or DELETE, optional for CREATE. This is the id of the target variable mode. For CREATE, you can provide a temporary id. */
  id?: string
  /** Required for CREATE, optional for UPDATE. The name of the mode. */
  name?: string
  /** Required. The variable collection that contains or will contain the mode. You can use the temporary id of a variable collection. */
  variableCollectionId: string
}

type VariableModeCreate = VariableMode & {
  action: 'CREATE'
  id?: string
  name: string
  variableCollectionId: string
}

/** An object that represents the action you want to take with a variable. */
export type Variable = {
  /** CREATE, UPDATE, or DELETE, depending on the action you want to perform. Always required. */
  action: Action
  /** Required for UPDATE or DELETE, optional for CREATE. This is the id of the target variable. For CREATE, you can provide a temporary id. */
  id?: string
  /** Required for CREATE, optional for UPDATE. The name of the variable. */
  name?: string
  /** BOOLEAN, FLOAT, STRING, or COLOR. Required for CREATE. The variable's type. */
  resolvedType?: VariableType
}

export type VariableModeValue = {
  /** The target variable. You can use the temporary id of a variable. */
  variableId: string
  /** Must correspond to a mode in the variable collection that contains the target variable. */
  modeId: string
  /** The value for the variable. The value must match the variable's type. If setting to a variable alias, the alias must resolve to this type. */
  value: VariableValue
}

export type VariableResponse = {
  id: string
  name: string
  key: string
  variableCollectionId: string
  resolvedType: VariableType
  valuesByMode: Record<
    string,
    VariableModeValue | VariableAlias | VariableValue
  >
  remote: boolean
}

export type VariableCollectionResponse = {
  id: string
  name: string
  key: string
  modes: { modeId: string; name: string }[]
  defaultModeId: string
  remote: boolean
}

export type LocalVariables = {
  variables: Record<string, VariableResponse>
  variableCollections: Record<string, VariableCollectionResponse>
}

export type PublishedVariables = {
  variables: Record<
    string,
    Pick<
      VariableResponse,
      'id' | 'name' | 'key' | 'variableCollectionId' | 'resolvedType'
    > & {
      subscribed_id: string
    }
  >
  variableCollections: Record<
    string,
    Pick<VariableCollectionResponse, 'id' | 'name'> & {
      subscribed_id: string
      key: string
    }
  >
}
