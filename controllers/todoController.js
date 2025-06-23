import { Todo } from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = req.body;

    // Check if request is an array (multiple todos)
    if (Array.isArray(data)) {
      // Validate all todos
      for (const todo of data) {
        if (!todo.title || !todo.description) {
          return res.status(403).json({
            success: false,
            message: "All fields required for each todo.",
          });
        }
      }

      // Attach user ID and save all todos
      const todosToSave = data.map((todo) => ({
        ...todo,
        user: userId,
      }));

      const savedTodos = await Todo.insertMany(todosToSave);

      return res.status(201).json({
        success: true,
        message: "Todos created.",
        todos: savedTodos,
      });
    } else {
      // Single todo object
      const { title, description } = data;
      if (!title || !description) {
        return res.status(403).json({
          success: false,
          message: "All fields required.",
        });
      }

      const todo = await new Todo({ title, description, user: userId }).save();

      return res.status(201).json({
        success: true,
        message: "Todo created.",
        todo,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllTodo = async (req, res) => {
  // GET /api/todo?pageNo=2&pageSize=5&search=project

  try {
    const userId = req.user.userId;
    // Extract query parameters
    const { pageNo = 1, pageSize = 10, search = "" } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(pageNo);
    const limitNumber = parseInt(pageSize);

    // Create a search filter (case-insensitive on title or description)
    const searchFilter = {
      user: userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    // Get total count for pagination
    const total = await Todo.countDocuments(searchFilter);

    // Fetch paginated and filtered todos
    const todos = await Todo.find(searchFilter)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: -1 }); // Optional: newest first

    return res.status(200).json({
      success: true,
      total,
      pageNo: pageNumber,
      pageSize: Math.ceil(total / limitNumber),
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    if (!title && !description && !completed) {
      return res.status(400).json({
        success: false,
        message: "Please update some values",
      });
    }
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo update Succesfuly",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
