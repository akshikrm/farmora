- Reassigning to a different batch is having quantity calculation issue
- After the quantity fix need to add base price for items

- How would I handle reassign to a batch
  - If reassigning without quantity change then the quantity in purchase does
    not need to be updated
  - If reassigning with quantity change there are a few scenarios
    - Reassigning to an empty batch
    - Reassigning to a batch which already has items
      - What if the quantity is different, meaning we are reassigning the
        entire quantity

- There is a scenario that needs to be addressed the current implementation
  there seems to be a problem, which is that a purchase have an entry for
  batch_id which is not needed for us as the relationship is not reliable.

  Because whenever we purchase something it is going to stock there is no need
  for batch_id entry in the purchase table as the assign_table will have that
  information and you can purchase without assigning to a batch straight to
  stock
