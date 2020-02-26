export const avjMongoStringDefinition = {
  type: 'string',
  minLength: 24,
  maxLength: 24
}

export const createRootCommentSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1
    },
    body: {
      type: 'string',
      minLength: 0
    },
    createdByUsername: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['title', 'createdByUsername'],
  additionalProperties: false
}

export const createChildCommentSchema = {
  type: 'object',
  properties: {
    parentId: avjMongoStringDefinition,
    body: {
      type: 'string',
      minLength: 1
    },
    createdByUsername: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['parentId', 'body', 'createdByUsername'],
  additionalProperties: false
}
