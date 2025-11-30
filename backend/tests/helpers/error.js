export class WorkflowError extends Error {
  constructor(res) {
    super(
      `${res.body.message}:\n${res.status}\nbody: ${JSON.stringify(res.body)}`
    )
  }
}
