import React from 'react';
import { Container, Box, Heading, Text, Table } from '@chakra-ui/react';

const ParkingTable = () => {
  const parkingSpots = [
    { id: 'A-01', address: 'Улица 1' },
    { id: 'A-02', address: 'Улица 2' },
    { id: 'B-01', address: 'Улица 3' },
    { id: 'C-05', address: 'Улица 4' },
  ];

  return (
    <Container maxW="md" p={0} borderRadius="md" boxShadow="md">
      <Box bg="#2A4365" p={4} borderTopRadius="md">
        <Heading size="md" color="white">PARKING</Heading>
      </Box>

      <Box p={4}>
        <Heading size="md" mb={4}>Список парковочных мест</Heading>

        <Table.Root variant="line" size="md">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Парковочное место</Table.ColumnHeader>
              <Table.ColumnHeader>Адрес</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {parkingSpots.map((spot) => (
              <Table.Row key={spot.id}>
                <Table.Cell>{spot.id}</Table.Cell>
                <Table.Cell>{spot.address}</Table.Cell>
              </Table.Row>
            ))}
            <Table.Row>
              <Table.Cell>...</Table.Cell>
              <Table.Cell>...</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Text mt={4} fontWeight="medium">
          Всего мест: 24
        </Text>
      </Box>
    </Container>
  );
};

export default ParkingTable;
