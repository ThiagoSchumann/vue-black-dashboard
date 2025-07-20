<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h5 slot="header" class="title">Categorias</h5>
        <form @submit.prevent="addCategory">
          <div class="row">
            <div class="col-8">
              <base-input label="Nome" v-model="newCategory.name" placeholder="Categoria" />
            </div>
            <div class="col-4 d-flex align-items-end">
              <base-button type="primary" native-type="submit" fill>Adicionar</base-button>
            </div>
          </div>
        </form>
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
                  <base-button size="sm" type="danger" @click="removeCategory(index)">Remover</base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      newCategory: {
        name: "",
      },
      categories: JSON.parse(localStorage.getItem("categories") || "[]"),
    };
  },
  methods: {
    addCategory() {
      if (!this.newCategory.name.trim()) return;
      this.categories.push({ name: this.newCategory.name.trim() });
      this.save();
      this.newCategory.name = "";
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

