'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao Vitriny Web</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Gerencie seus produtos e imagens para e-commerce de forma simples e eficiente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card de Cadastro de Produtos */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">Cadastrar Produtos</h3>
                <p className="text-sm text-gray-500">Adicione novos produtos ao catálogo</p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/produtos/novo" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cadastrar Produto
              </Link>
            </div>
          </div>
        </div>

        {/* Card de Upload em Massa */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">Upload em Massa</h3>
                <p className="text-sm text-gray-500">Faça upload de múltiplas imagens</p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/produtos/upload-massa" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Upload em Massa
              </Link>
            </div>
          </div>
        </div>

        {/* Card de Busca */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">Buscar Produtos</h3>
                <p className="text-sm text-gray-500">Encontre e gerencie produtos existentes</p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/busca" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Buscar Produtos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
