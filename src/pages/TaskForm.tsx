import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createTask,
  updateTask,
  fetchTasks,
} from "../features/tasks/taskSlice";
import * as Yup from "yup";
import { ITask } from "../types/types";

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string(),
  status: Yup.string().oneOf(["pending", "completed"]).required("Required"),
});

export default function TaskForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks } = useAppSelector((state) => state.tasks);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "pending" as "pending" | "completed",
    },
    validationSchema: TaskSchema,
    onSubmit: async (values) => {
      if (id) {
        await dispatch(updateTask({ ...values, _id: id } as ITask));
      } else {
        await dispatch(createTask(values));
      }
      navigate("/");
    },
  });
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (id && tasks) {
      const task = tasks.find(task => task._id === id);
      if (task) {
        formik.setValues({
          title: task.title || "",
          description: task.description || "",
          status: (task.status as "pending" | "completed") || "pending"
        });
      }
    }
  }, [id, tasks, formik.setValues]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit" : "New"} Task</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full p-2 border rounded"
          />
          {formik.errors.title && (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full p-2 border rounded h-32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            className="w-full p-2 border rounded">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {id ? "Update" : "Create"} Task
        </button>
      </form>
    </div>
  );
}
