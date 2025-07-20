<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card>
        <template #header>
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="title mb-0">Categorias</h5>
            <base-button type="primary" size="sm" @click="openNew">Novo</base-button>
          </div>
        </template>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="text-primary">
              <tr>
                <th>Nome</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cat, index) in categories" :key="index">
                <td>{{ cat.name }}</td>
                <td class="text-right">
                  <base-button size="sm" type="info" @click="editCategory(index)">Editar</base-button>
                  <base-button size="sm" type="danger" @click="removeCategory(index)">Remover</base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </card>
      </div>
    </div>

    <modal :show.sync="showModal">
      <template #header>
        <h5 class="modal-title">{{ modalTitle }}</h5>
      </template>
      <base-input label="Nome" v-model="form.name" />
      <template #footer>
        <base-button type="secondary" @click="showModal = false">Cancelar</base-button>
        <base-button type="primary" @click="saveCategory">Salvar</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      categories: JSON.parse(localStorage.getItem("categories") || "[]"),
      showModal: false,
      editingIndex: null,
      form: { name: "" },
    };
  },
  computed: {
    modalTitle() {
      return this.editingIndex === null ? "Nova Categoria" : "Editar Categoria";
    },
  },
  methods: {
    openNew() {
      this.editingIndex = null;
      this.form = { name: "" };
      this.showModal = true;
    },
    editCategory(index) {
      this.editingIndex = index;
      this.form = { ...this.categories[index] };
      this.showModal = true;
    },
    saveCategory() {
      if (!this.form.name.trim()) return;
      if (this.editingIndex === null) {
        this.categories.push({ name: this.form.name.trim() });
      } else {
        this.$set(this.categories, this.editingIndex, {
          name: this.form.name.trim(),
        });
      }
      this.save();
      this.showModal = false;
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
      this.save();
    },
    save() {
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 1rem;
}
</style>

