import useLocalStorage from '../../hooks/useLocalStorage';
import { mockPets } from '../../data/mockPets';
import { Table, Badge, Button } from 'react-bootstrap';

const AdminPets = () => {
  const { data: petsData } = useLocalStorage('catalogPets_v6', mockPets);

  return (
    <div className="admin-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-0">Gestión de Mascotas</h2>
        <Badge bg="primary" className="px-3 py-2 rounded-pill">
          Total: {petsData.length}
        </Badge>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="px-4 py-3 border-0">ID</th>
              <th className="px-4 py-3 border-0">Nombre</th>
              <th className="px-4 py-3 border-0">Especie</th>
              <th className="px-4 py-3 border-0">Raza</th>
              <th className="px-4 py-3 border-0">Estado</th>
              <th className="px-4 py-3 border-0 text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {petsData.map((pet) => (
              <tr key={pet.id}>
                <td className="px-4 py-3 align-middle text-label">#{pet.id}</td>
                <td className="px-4 py-3 align-middle">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="rounded-circle object-fit-cover"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <span className="fw-bold">{pet.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 align-middle text-capitalize">
                  {pet.species === 'dogs'
                    ? 'Perro'
                    : pet.species === 'cats'
                      ? 'Gato'
                      : 'Otro'}
                </td>
                <td className="px-4 py-3 align-middle">{pet.breed}</td>
                <td className="px-4 py-3 align-middle">
                  <Badge
                    bg={pet.isAdopted ? 'success' : 'warning'}
                    className={`rounded-pill px-3 py-2 ${pet.isAdopted ? 'bg-opacity-10 text-success' : 'bg-opacity-10 text-warning'}`}
                    style={{
                      backgroundColor: pet.isAdopted ? '#d1e7dd' : '#fff3cd',
                    }}
                  >
                    {pet.isAdopted ? 'Adoptado' : 'Disponible'}
                  </Badge>
                </td>
                <td className="px-4 py-3 align-middle text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '18px' }}
                      >
                        edit
                      </span>
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center text-danger"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '18px' }}
                      >
                        delete
                      </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPets;
