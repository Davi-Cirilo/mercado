import db from '../BancoDeDados/db.js'

///////////////////////////////////////////////////////////

export const getClienteController = (req, res) => {
  try {
    const { idCliente } = req.query
    let comandosql = 'SELECT * FROM clientes'
    let paramssql = []
    if(idCliente){
        comandosql += ' WHERE id = ?'
        paramssql.push(idCliente)
    }
    db.get(comandosql, paramssql, (err, row) => {
      if (err) {
        console.log('Erro ao encontrar cliente', err)
        return res.status(500).json({ mensagem: 'Erro ao buscar cliente' })
      }
      if (!row) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' })
      }
      res.status(200).json(row);
    })
  } catch (error) {
    res.status(500).json({ mensagem: 'Cliente não encontrado' })
  }
}

///////////////////////////////////////////////////////////

export const postClienteController = (req, res) => {
  try {
    const { nome, email } = req.body

    db.run(
      'INSERT INTO clientes (nome, email) VALUES (?, ?)',
      [nome, email],
      function (err) {
        if (err) {
          console.log('Erro ao adicionar cliente:', err)
          return res.status(500).json({ mensagem: 'Erro ao adicionar cliente' })
        }

        res.status(201).json({ mensagem: `Cliente ${this.lastID} adicionado com sucesso!` })
      }
    );
  } catch (error) {
    res.status(500).json({ mensagem: 'Cliente não pode ser adicionado' })
  }
};

///////////////////////////////////////////////////////////

export const putClienteController = (req, res) => {
  try {
    const { id, nome, email } = req.body;

    db.run(
      'UPDATE clientes SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id],
      function (err) {
        if (err) {
          console.log('Erro ao atualizar cliente:', err)
          return res.status(500).json({ mensagem: 'Erro ao atualizar cliente' })
        }

        if (this.changes === 0) {
          return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }

        res.status(200).json({ mensagem: `Cliente ${id} atualizado com sucesso!` })
      }
    );
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro na atualização do cliente' })
  }
};

///////////////////////////////////////////////////////////

export const deleteClienteController = (req, res) => {
  try {
    const { id } = req.body

    db.run('DELETE FROM clientes WHERE id = ?', [id], function (err) {
      if (err) {
        console.log('Erro ao deletar cliente:', err)
        return res.status(500).json({ mensagem: 'Erro ao deletar cliente' })
      }

      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' })
      }

      res.status(200).json({ mensagem: `Cliente ${id} deletado com sucesso!` })
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro na exclusão do cliente' })
  }
};
