import categoryRepository from "../repositories/categoryRepository";

type ServiceResponse<T = unknown> = {
  data?: T;
  message?: string;
  statusCode: number;
};

const toNumber = (value: string | number) => Number(value);

const getAllCategory = async (): Promise<ServiceResponse> => {
  const result = await categoryRepository.findAll();

  if (result.length === 0) {
    return { message: "List Category Empty", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const createCategory = async (cateName: string): Promise<ServiceResponse> => {
  if (!cateName) {
    return { message: "Category name is Require!!", statusCode: 400 };
  }

  await categoryRepository.create(cateName);

  return { message: "Create Category Successfully", statusCode: 200 };
};

const updateCategory = async (
  cateId: string | number,
  cateName: string
): Promise<ServiceResponse> => {
  if (!cateId || !cateName) {
    return { message: "Category id and name is Require!!", statusCode: 400 };
  }

  const categoryId = toNumber(cateId);
  const category = await categoryRepository.findById(categoryId);

  if (!category) {
    return { message: "Category not found!", statusCode: 404 };
  }

  await categoryRepository.update(categoryId, cateName);

  return { message: "Update Category Successfully", statusCode: 200 };
};

const deleteCategory = async (cateId: string | number): Promise<ServiceResponse> => {
  if (!cateId) {
    return { message: "Category id is Require!!", statusCode: 400 };
  }

  const categoryId = toNumber(cateId);
  const category = await categoryRepository.findById(categoryId);

  if (!category) {
    return { message: "Category not found!", statusCode: 404 };
  }

  await categoryRepository.remove(categoryId);

  return { message: "Delete Category Successfully", statusCode: 200 };
};

const findCategory = async (cateName: string): Promise<ServiceResponse> => {
  if (!cateName) {
    return { message: "Please provide search information", statusCode: 400 };
  }

  const result = await categoryRepository.findByNamePrefix(cateName);

  if (result.length === 0) {
    return { message: "Category not found!", statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
};

const getCategoryById = async (cateId: string): Promise<ServiceResponse> => {
  if (!cateId) {
    return { message: "Category id is Require!!", statusCode: 400 };
  }

  const result = await categoryRepository.findById(toNumber(cateId));

  if (!result) {
    return { message: "Category not found!", statusCode: 404 };
  }

  return { data: [result], statusCode: 200 };
};

export default {
  createCategory,
  deleteCategory,
  findCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
};
