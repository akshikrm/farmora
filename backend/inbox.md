What I need is to implement integration coast.

integration coast is the amount given to a farm for handling integrations.

So what we need is a new model with integration coast, farm, and date fields.

The fields will be:

- integration_cost: DecimalField
- farm: FK to Farm model
- date: Date
- master_id: <id of the company/manager>

It needs crud operations and a simple API to get the total integration cost for a given farm over a date range.
