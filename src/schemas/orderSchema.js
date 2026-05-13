export const orderSchema = {
  type: 'object',
  required: ['customerId', 'items'],
  properties: {
    customerId: {
      type: 'string',
      format: 'uuid',
      errorMessage: 'Must be a valid Customer UUID'
    },
    items: {
      type: 'array',
      minItems: 1,
      errorMessage: 'Order must have at least one item',
      items: {
        type: 'object',
        required: ['productName', 'quantity', 'unitPrice'],
        properties: {
          productName: {
            type: 'string', minLength: 1,
            errorMessage: 'Product name is required'
          },
          quantity: {
            type: 'integer', minimum: 1,
            errorMessage: 'Quantity must be at least 1'
          },
          unitPrice: {
            type: 'number', minimum: 0.01,
            errorMessage: 'Unit price must be greater than 0'
          }
        }
      }
    }
  }
};
