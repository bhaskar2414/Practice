import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    };

    setLoading(false);

    fetchUsers();
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-4">
          <h2 className="text-2xl font-bold">Users</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={"outline"}
              className={"rounded cursor-pointer ring-1 ring-primary"}
            >
              <Link to="/users/create" className="flex items-center">
                <Plus className="mr-2" />
                Add New User
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className={"text-left"}>{user.name}</TableCell>
                  <TableCell className={"text-left"}>{user.email}</TableCell>
                  <TableCell className={"text-left"}>Admin</TableCell>
                  <TableCell className={"text-left"}>Active</TableCell>
                  <TableCell className={"text-left"}>2 days ago</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UsersList;
