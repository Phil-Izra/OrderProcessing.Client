import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/LocalOffer";
import { createOrder } from "../api/orderApi";
import { ajvResolver } from "../schemas/ajvResolver";
import { orderSchema } from "../schemas/orderSchema";

export default function CreateOrderPage() {
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: ajvResolver(orderSchema),
    defaultValues: { customerId: "", items: [{ productName: "", quantity: 1, unitPrice: 0 }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => navigate(`/orders/${data.id}`),
  });

  return (
    <Box maxWidth={700} mx="auto">
      <Typography variant="h5" fontWeight={700} mb={3}>Create Order</Typography>

      {mutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {mutation.error?.response?.data?.message ?? "Failed to create order."}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <TextField
            label="Customer ID (UUID)"
            fullWidth
            sx={{ mb: 3 }}
            {...register("customerId")}
            error={!!errors.customerId}
            helperText={errors.customerId?.message}
          />

          <Typography variant="h6" fontWeight={600} mb={1}>Items</Typography>
          <Divider sx={{ mb: 2 }} />

          {fields.map((field, index) => (
            <Box key={field.id} sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 2 }}>
              <TextField
                label="Product Name"
                {...register(`items.${index}.productName`)}
                error={!!errors.items?.[index]?.productName}
                helperText={errors.items?.[index]?.productName?.message}
                sx={{ flex: 2 }}
              />
              <TextField
                label="Qty"
                type="number"
                inputProps={{ min: 1 }}
                {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                error={!!errors.items?.[index]?.quantity}
                helperText={errors.items?.[index]?.quantity?.message}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Unit Price"
                type="number"
                inputProps={{ min: 0.01, step: 0.01 }}
                {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                error={!!errors.items?.[index]?.unitPrice}
                helperText={errors.items?.[index]?.unitPrice?.message}
                sx={{ flex: 1 }}
              />
              <IconButton onClick={() => remove(index)} disabled={fields.length === 1} sx={{ mt: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            onClick={() => append({ productName: "", quantity: 1, unitPrice: 0 })}
            sx={{ mb: 3 }}
          >
            + Add Item
          </Button>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Place Order"}
            </Button>
            <Button variant="outlined" onClick={() => navigate("/orders")}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
