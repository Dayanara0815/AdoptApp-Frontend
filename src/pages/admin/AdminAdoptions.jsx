import useLocalStorage from '../../hooks/useLocalStorage';
import { mockPets } from '../../data/mockPets';
import { Table, Badge, Button, Card } from 'react-bootstrap';

const AdminAdoptions = () => {
  const { data: petsData } = useLocalStorage('catalogPets_v6', mockPets);
  const adoptedPets = petsData.filter((pet) => pet.isAdopted);

  return (
    <div className="admin-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-success mb-0">Registro de Adopciones</h2>
          <p className="text-secondary mb-0">
            Mascotas que ya encontraron un hogar
          </p>
        </div>
        <Badge bg="success" className="px-3 py-2 rounded-pill">
          Total: {adoptedPets.length}
        </Badge>
      </div>

      {adoptedPets.length === 0 ? (
        <Card className="border-0 shadow-sm rounded-xl p-5 text-center">
          <Card.Body>
            <span
              className="material-symbols-outlined text-secondary mb-3"
              style={{ fontSize: '48px' }}
            >
              sentiment_dissatisfied
            </span>
            <h4 className="text-secondary">
              Aún no hay adopciones registradas
            </h4>
            <p className="text-muted">
              Las mascotas adoptadas aparecerán en esta sección.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
          <Table hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0">ID</th>
                <th className="px-4 py-3 border-0">Mascota</th>
                <th className="px-4 py-3 border-0">Especie</th>
                <th className="px-4 py-3 border-0">Fecha Adopción</th>
                <th className="px-4 py-3 border-0">Estado</th>
                <th className="px-4 py-3 border-0 text-end">Certificado</th>
              </tr>
            </thead>
            <tbody>
              {adoptedPets.map((pet) => (
                <tr key={pet.id}>
                  <td className="px-4 py-3 align-middle text-label">
                    #{pet.id}
                  </td>
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
                  <td className="px-4 py-3 align-middle text-label">
                    27/04/2026
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Badge
                      bg="success"
                      className="rounded-pill px-3 py-2 bg-opacity-10 text-success"
                      style={{ backgroundColor: '#d1e7dd' }}
                    >
                      Finalizado
                    </Badge>
                  </td>
                  <td className="px-4 py-3 align-middle text-end">
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="rounded-pill px-3 d-inline-flex align-items-center gap-2"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '18px' }}
                      >
                        description
                      </span>
                      Ver Acta
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminAdoptions;
