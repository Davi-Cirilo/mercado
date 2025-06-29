import db from '../BancoDeDados/db.js';

export const getProdutoController = (req, res) => {
  try {
    const { idProduto } = req.query
    let comandosql = 'SELECT * FROM produtos'
    let paramssql = []
    if(idProduto){
      comandosql += ' WHERE id = ?'
      paramssql.push(idProduto)
  }
    db.get(comandosql, paramssql, (err, row) => {
      if (err) {
        console.log('Erro ao encontrar produto', err);
        return res.status(500).json({ mensagem: 'Erro ao buscar produto' })
      }
      if (!row) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' })
      }
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Produto não encontrado' })
  }
}

/////////////////////////////////////////////////////////////////////////

export const postProdutoController = (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;

    db.run(
      'INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)',
      [nome, preco, estoque],
      function (err) {
        if (err) {
          console.log('Erro ao adicionar produto:', err)
          return res.status(500).json({ mensagem: 'Erro ao adicionar produto' })
        }
        res.status(201).json({ mensagem: `Produto ${this.lastID} adicionado com sucesso!` })
      }
    )
  } catch (error) {
    res.status(500).json({ mensagem: 'Produto não pode ser adicionado' });
  }
};

/////////////////////////////////////////////////////////////////////////

export const putProdutoController = (req, res) => {
  try {
    const { id, nome, preco, estoque } = req.body

    db.run(
      'UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?',
      [nome, preco, estoque, id],
      function (err) {
        if (err) {
          console.log('Erro ao atualizar produto:', err);
          return res.status(500).json({ mensagem: 'Erro ao atualizar produto' })
        }
        if (this.changes === 0) {
          return res.status(404).json({ mensagem: 'Produto não encontrado' })
        }
        res.status(200).json({ mensagem: `Produto ${id} atualizado com sucesso!` })
      }
    )
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro na atualização do produto' })
  }
}

/////////////////////////////////////////////////////////////////////////

export const deleteProdutoController = (req, res) => {
  try {
    const { id } = req.body;

    db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
      if (err) {
        console.log('Erro ao deletar produto:', err)
        return res.status(500).json({ mensagem: 'Erro ao deletar produto' })
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' })
      }
      res.status(200).json({ mensagem: `Produto ${id} deletado com sucesso!` })
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro na exclusão do produto' })
  }
};
